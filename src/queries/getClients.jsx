import supabase from "../config/supabaseClient";

export async function getClients() {
    const { data, error } = await supabase
      .from('clients')
      .select()
  
    if (error) {
      console.error(error);
      return [];
    }

    //console.log(data);
  
    return data.map((option) => ({
      email: option.email,
      business_name: option.business_name,
      contact: option.contact_name,
      logo:option.logoUrl
    }));
  }
  
