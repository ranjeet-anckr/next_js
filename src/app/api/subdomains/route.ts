export async function GET() {
  const subdomains: Array<{ id: number; name: string; description: string }> = [
    { id: 1, name: "hello", description: "Subdomain for greetings" },
    { id: 2, name: "blog", description: "Subdomain for blog content" },
    { id: 3, name: "shop", description: "Subdomain for the online store" },
    { id: 4, name: "ranjeetkumar", description: "Subdomain for the latest news" },
    { id: 5, name: "analkumar", description: "Subdomain for customer support" },
    {
      id: 6,
      name: "community",
      description: "Subdomain for the user community",
    },
    {
      id: 7,
      name: "forum",
      description: "Subdomain for discussions and forums",
    },
    { id: 8, name: "events", description: "Subdomain for event management" },
    { id: 9, name: "careers", description: "Subdomain for job opportunities" },
    {
      id: 10,
      name: "docs",
      description: "Subdomain for documentation and guides",
    },
  ];

  return new Response(JSON.stringify(subdomains), {
    headers: { "Content-Type": "application/json" },
  });
}
