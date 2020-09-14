const endPoint = "http://localhost:9000/graphql";

const graphqlRequest = async (query, variables = {}) => {
  const resp = await fetch(endPoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const ans = await resp.json();
  if (ans.errors) {
    throw new Error(ans.errors.map((err) => err.message).join("\n"));
  }
  return ans.data;
};
export async function loadJobs() {
  const query = `{
    jobs{
     id
     title
   
     company{
       id
       name
       
     }
   }
     
   }
   `;
  const data = await graphqlRequest(query);
  return data.jobs;
}
export async function loadJob(id) {
  const query = `query JobQuery($id:ID!) {
  job(id:$id){
   id
   title
   company{
       id 
       name
   }
   description
 }
 }
   `;
  const data = await graphqlRequest(query, { id });
  return data.job;
}

export async function loadCompany(id) {
  const query = `query CompanyQuery($id:ID!) {
  company(id:$id){
       id 
       name
   description
   jobs{
     id
     title
   }
 }
 }
   `;
  const data = await graphqlRequest(query, { id });
  console.log(data)
  return data.company;
}
