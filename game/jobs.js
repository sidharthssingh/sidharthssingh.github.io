import { state, saveState } from "./state.js";

const MOCK_JOBS = [
  // Building 0: Tech Tower
  { company: "Google", title: "Senior Product Manager", salary: 250, location: "Mountain View CA", url: "https://careers.google.com", buildingId: 0 },
  { company: "Microsoft", title: "Technical PM - Azure", salary: 220, location: "Seattle WA", url: "https://careers.microsoft.com", buildingId: 0 },
  { company: "Apple", title: "Product Manager - ML Platform", salary: 240, location: "Cupertino CA", url: "https://jobs.apple.com", buildingId: 0 },

  // Building 1: Startup Garage
  { company: "Vercel", title: "Product Manager", salary: 180, location: "Remote", url: "https://vercel.com/careers", buildingId: 1 },
  { company: "Supabase", title: "Technical PM", salary: 170, location: "Remote", url: "https://supabase.com/careers", buildingId: 1 },
  { company: "Linear", title: "Product Manager", salary: 190, location: "Remote", url: "https://linear.app/careers", buildingId: 1 },

  // Building 2: Gaming Den
  { company: "Riot Games", title: "Senior PM - Live Services", salary: 200, location: "Los Angeles CA", url: "https://www.riotgames.com/careers", buildingId: 2 },
  { company: "Epic Games", title: "Technical PM", salary: 190, location: "Cary NC", url: "https://www.epicgames.com/careers", buildingId: 2 },
  { company: "Zynga", title: "Product Manager - Mobile", salary: 180, location: "Austin TX", url: "https://www.zynga.com/careers", buildingId: 2 },

  // Building 3: Finance HQ
  { company: "Stripe", title: "Product Manager - Payments", salary: 260, location: "San Francisco CA", url: "https://stripe.com/jobs", buildingId: 3 },
  { company: "Robinhood", title: "Senior PM - Trading", salary: 230, location: "Menlo Park CA", url: "https://robinhood.com/careers", buildingId: 3 },
  { company: "Plaid", title: "Technical PM", salary: 210, location: "San Francisco CA", url: "https://plaid.com/careers", buildingId: 3 },

  // Building 4: AI Labs
  { company: "Anthropic", title: "Product Manager - Claude", salary: 280, location: "San Francisco CA", url: "https://www.anthropic.com/careers", buildingId: 4 },
  { company: "OpenAI", title: "Technical PM - API Platform", salary: 290, location: "San Francisco CA", url: "https://openai.com/careers", buildingId: 4 },
  { company: "Databricks", title: "PM - ML Platform", salary: 240, location: "San Francisco CA", url: "https://www.databricks.com/careers", buildingId: 4 },
];

export async function fetchJobs() {
  const jobs = MOCK_JOBS.map((job) => ({
    ...job,
    coins: Math.round(job.salary / 10),
  }));

  state.jobs = jobs;
  saveState();

  return jobs;
}
