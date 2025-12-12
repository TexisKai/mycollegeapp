import EventDetails from "@/components/events/EventDetails";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function EventPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("events")
    .select(`
      id,
      title,
      description,
      date,
      time,
      location,
      banner_image,
      tags,
      societies:society_id (
        id,
        name,
        logo_url
      )
    `)
    .eq("id", params.id)
    .single();

  if (error || !data) {
    console.error("Event fetch error:", error);
    return <div className="p-6">Event not found</div>;
  }

  // ensure societies normalized to single object (or null)
  const society = Array.isArray(data.societies) && data.societies.length > 0 ? data.societies[0] : null;

  const normalizedEvent = {
    id: data.id,
    title: data.title,
    description: data.description,
    date: data.date,
    time: data.time,
    location: data.location,
    banner_image: data.banner_image,
    tags: data.tags,
    society,
  };

  return <EventDetails event={normalizedEvent as any} />;
}
