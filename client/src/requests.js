const endPoint = "http://localhost:9000/graphql";
export async function loadJobs() {
const resp =  await fetch(endPoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
                jobs{
                 id
                 title
               
                 company{
                   id
                   name
                   
                 }
               }
                 
               }
               `,
    }),
  })
  const ans = await resp.json()
  console.log(ans)
  return ans.data.jobs
}
export async function loadJob(id) {
    const resp =  await fetch(endPoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            query: `query JobQuery($id:ID!) {
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
                 `,
                 variables:{id}
        }),
      })
      const ans = await resp.json()
      console.log(ans)
      return ans.data.job
    }
    