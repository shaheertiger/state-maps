import {appleApps} from '@/lib/apple-apps';
export const dynamic='force-static';
export function GET(){return Response.json(appleApps.map(({slug,name,developer,category})=>({slug,name,developer,category})),{headers:{'Cache-Control':'public, max-age=3600'}});}
