import { Booking } from "@/types/api";
import axios from "axios";

//lib/apiClient.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchProperties(limit=10,offset=10){

    try {
       const response = await apiClient.get(`${API_BASE_URL}/properties?limit=${limit}&offset=${offset}`);

    if(!response){
        throw new Error('Failed to fetch properties');
    }
    return response.data; 
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
        }
        throw new Error('An unexpected error occurred');
    }
    
}


export async function fetchPropertyById(id:string){
    try {
        const response = await apiClient.get(`${API_BASE_URL}/properties/${id}`);
    if(!response){
        throw new Error('Failed to fetch property');
    }
    return response.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
        }
        throw new Error('An unexpected error occurred');
    }
    
}
export async function fetchReviewsByPropertyId(id:string){
    try {
         const response = await apiClient.get(`${API_BASE_URL}/properties/${id}/reviews`);
    if(!response){
        throw new Error('Failed to fetch reviews');
    }
    return response.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
        }
        throw new Error('An unexpected error occurred');
    }
   
}

export async function createBooking(bookingData: Booking){

    try {
        const response = await apiClient.post(`${API_BASE_URL}/bookings`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(bookingData)
    });
    if(!response){
        throw new Error('Failed to create booking');
    }
    return response.data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
        }
        throw new Error('An unexpected error occurred');
    }
    

}