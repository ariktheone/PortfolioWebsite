import { NextResponse } from 'next/server';
import { useEffect, useState } from 'react';

export async function GET() {
  try {
    const response = await fetch('https://sc.ecombullet.com/api/dashboard/totalusers', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// In your component that needs this data
const [statsData, setStatsData] = useState(null);

useEffect(() => {
  async function fetchStats() {
    try {
      const response = await fetch('/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStatsData(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }
  
  fetchStats();
}, []);