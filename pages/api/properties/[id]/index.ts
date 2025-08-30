import { NextRequest,NextResponse } from "next/server";
import { mockProperties } from "@/lib/mockData";

export async function GET(request:NextRequest,{params}:{params:{id:string}}

) {
   try {
    const  property = mockProperties.find(p => p.id === params.id);

    if(!property){
        return NextResponse.json(
            {error:"Property not found"},
            {status:404}
        )
    }
    return NextResponse.json(
        {property}, 
        {status:200}
    )
        
   } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
   } 
}