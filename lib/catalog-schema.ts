import {catalogPages,catalogFaq,type CatalogPage} from './catalog';
import {site} from './site';
import {reviewedDate} from './content';
export function catalogSchema(p:CatalogPage){
  const url=site.url+p.path;
  const children=catalogPages.filter(c=>c.index&&(p.kind==='hub'?c.kind==='app':p.kind==='app'?c.kind==='hub':c.path.startsWith(p.path+'/')));
  const schema:Record<string,unknown>[]=[{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',item:site.url},{name:p.title,item:url}].map((x,i)=>({'@type':'ListItem',position:i+1,...x}))},{'@context':'https://schema.org','@type':'FAQPage',mainEntity:catalogFaq(p).map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}];
  const collection={'@context':'https://schema.org','@type':'ItemList',numberOfItems:children.length,itemListElement:children.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.title,url:site.url+c.path}))};
  if(p.kind==='hub'||p.kind==='directory')schema.push({'@context':'https://schema.org','@type':'CollectionPage',name:p.title,url,description:p.description},collection);
  if(p.app&&p.kind==='app')schema.push({'@context':'https://schema.org','@type':'SoftwareApplication',name:p.app.name,operatingSystem:'iOS',url:p.app.source.url,description:p.app.summary},collection);
  if(p.kind==='task-app')schema.push({'@context':'https://schema.org','@type':'Article',headline:p.title,image:site.url+'/og'+p.path,datePublished:reviewedDate,dateModified:reviewedDate,author:{'@id':site.url+'/#organization'},mainEntityOfPage:url});
  if(p.task)schema.push({'@context':'https://schema.org','@type':'HowTo',name:p.task.question,description:p.task.answer,step:p.task.steps.map((text,i)=>({'@type':'HowToStep',position:i+1,name:`Step ${i+1}`,text,url:`${url}#step-${i+1}`}))});
  if(p.term)schema.push({'@context':'https://schema.org','@type':'DefinedTerm',name:p.term.name,description:p.term.definition,url,inDefinedTermSet:{'@type':'DefinedTermSet',name:'VaultForYou privacy glossary',url:site.url+'/glossary'}});
  if(p.tool)schema.push({'@context':'https://schema.org','@type':'SoftwareApplication',name:p.tool.name,applicationCategory:'UtilitiesApplication',operatingSystem:'Web browser',url,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'},description:p.tool.description},{'@context':'https://schema.org','@type':'HowTo',name:`Use ${p.tool.name}`,step:(p.tool.slug==='exif-viewer'?['Select a supported JPEG file stored on your device.','Read the metadata fields and scope notice.','Optionally export a fresh PNG copy and inspect it before sharing.']:['Choose your concern and storage setup.','Review the generated actions and their sources.','Save or export the review if desired.']).map((text,i)=>({'@type':'HowToStep',position:i+1,text}))});
  if(p.kind==='compare')schema.push({'@context':'https://schema.org','@type':'Article',headline:p.title,image:site.url+'/og'+p.path,description:p.description,datePublished:reviewedDate,dateModified:reviewedDate,author:{'@id':site.url+'/#organization'},mainEntityOfPage:url});
  return schema;
}
