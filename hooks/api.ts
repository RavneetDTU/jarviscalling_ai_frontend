import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  name: string;
  locale: string; 
  status: string; // e.g., "ACTIVE", "PAUSED"
};

type FacebookLead = {
  id: string;
  created_time: string;
  field_data: {
    name: string;
    values: string[];
  }[];
};

export function useCampaigns(pageId: string, accessToken: string, defaultSelectedId?: string) {
  const [leads, setLeads] = useState<FacebookLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selected, setSelected] = useState<string | null>(defaultSelectedId ?? null);
  const [leadLoading, setLeadLoading] = useState(false);

  // Fetch campaigns once
  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://graph.facebook.com/v23.0/${pageId}/leadgen_forms?access_token=${accessToken}`
        );
        const data = await res.json();
        if (data?.data?.length) {
          setCampaigns(data.data);
          if (!defaultSelectedId) {
            setSelected(data.data[0]?.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, [pageId, accessToken, defaultSelectedId]);

  // Fetch leads when a campaign is selected
  useEffect(() => {
    if (!selected) return;

    async function fetchLeads() {
      setLeadLoading(true);
      try {
        const res = await fetch(
          `https://graph.facebook.com/v23.0/${selected}/leads?access_token=${accessToken}`
        );
        const data = await res.json();
        if (data.data) {
          setLeads(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLeadLoading(false);
      }
    }

    fetchLeads();
  }, [selected, accessToken]);

  return {
    campaigns,
    loading,             
    selected,
    setSelected,
    leads,     
    leadLoading,
    selectedCampaignName: campaigns.find(c => c.id === selected)?.name,
    selectedCampaignStatus: campaigns.find(c => c.id === selected)?.status,
  };
  
}
