export type MetadataResult={format:string;exif:boolean;fields:Record<string,string>;warnings:string[]};
// Reads a bounded subset of JPEG EXIF/TIFF. It never claims that absence of a parsed tag proves absence of metadata.
export function readPhotoMetadata(buffer:ArrayBuffer):MetadataResult{
 const v=new DataView(buffer),result:MetadataResult={format:'Unsupported',exif:false,fields:{},warnings:[]};
 if(v.byteLength<4||v.getUint16(0)!==0xffd8){result.warnings.push('Only JPEG EXIF is inspected. HEIC, PNG, WebP and other metadata containers are not analyzed.');return result;}
 result.format='JPEG';let pos=2;
 while(pos+4<=v.byteLength){if(v.getUint8(pos)!==255)break;const marker=v.getUint8(pos+1);pos+=2;if(marker===0xda||marker===0xd9)break;if(marker===0x01||marker>=0xd0&&marker<=0xd7)continue;const length=v.getUint16(pos);if(length<2||pos+length>v.byteLength){result.warnings.push('A malformed JPEG segment could not be read.');break;}
  if(marker===0xe1&&length>=8&&v.getUint32(pos+2)===0x45786966&&v.getUint16(pos+6)===0){result.exif=true;const base=pos+8,end=pos+length;
   try{if(base+8>end)throw Error('Truncated TIFF header');const order=v.getUint16(base);if(order!==0x4949&&order!==0x4d4d)throw Error('Invalid TIFF byte order');const le=order===0x4949;const u16=(o:number)=>{if(o<base||o+2>end)throw Error('Tag out of bounds');return v.getUint16(o,le)};const u32=(o:number)=>{if(o<base||o+4>end)throw Error('Tag out of bounds');return v.getUint32(o,le)};if(u16(base+2)!==42)throw Error('Invalid TIFF signature');
    const visited=new Set<number>();
    const directory=(offset:number,gps=false)=>{const start=base+offset;if(visited.has(start)||visited.size>=4)return;visited.add(start);const count=u16(start);if(count>256)throw Error('Too many metadata tags');for(let i=0;i<count;i++){const entry=start+2+i*12;const tag=u16(entry),type=u16(entry+2),n=u32(entry+4);const size=type===2?1:type===3?2:type===4?4:type===5?8:0;if(!size||!n||n>65536)continue;const data=n*size<=4?entry+8:base+u32(entry+8);if(data<base||data+n*size>end)throw Error('Metadata value outside segment');if(!gps&&(tag===0x8769||tag===0x8825)){directory(u32(entry+8),tag===0x8825);continue;}
     const labels:Record<number,string>=gps?{1:'GPS latitude reference',2:'GPS latitude (degrees, minutes, seconds)',3:'GPS longitude reference',4:'GPS longitude (degrees, minutes, seconds)'}:{0x10f:'Camera maker',0x110:'Camera model',0x132:'Modified date',0x9003:'Capture date',0x112:'Orientation',0x131:'Software'};const label=labels[tag];if(!label)continue;
     if(type===2){const bytes=new Uint8Array(buffer,data,Math.min(n,512));result.fields[label]=new TextDecoder().decode(bytes).replace(/\0[\s\S]*$/,'').replace(/[\x00-\x1f\x7f]/g,'');}else if(type===3){result.fields[label]=String(u16(data));}else if(type===5){const parts=[];for(let j=0;j<Math.min(n,3);j++){const divisor=u32(data+j*8+4);parts.push(divisor?String(Math.round(u32(data+j*8)/divisor*1000000)/1000000):'invalid');}result.fields[label]=parts.join(', ');}
    }};directory(u32(base+4));
   }catch{result.warnings.push('Some EXIF fields are malformed or outside this viewer’s supported subset.');}
  }pos+=length;
 }
 result.warnings.push('This viewer checks selected EXIF tags only. Missing fields do not prove that location or other metadata is absent from the file or other copies.');return result;
}
