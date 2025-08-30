import { NextRequest,NextResponse } from "next/server";
import { mockReviews } from "@/lib/mockData";
import { Rewind } from "lucide-react";

export async function GET(request:NextRequest,{params}:{params:{id:string}}

){
    try {
        const propertyReviews = mockReviews.filter(review => review.propertyId === params.id);

        if(!propertyReviews){
            return NextResponse.json(
                {error:"Reviews not found"},
                {status:404}
            )
        }
        return NextResponse.json(
            {
                reviews:propertyReviews,
                total:propertyReviews.length
            },
            {status:200}
        )
    } catch (error) {
        
    }
}