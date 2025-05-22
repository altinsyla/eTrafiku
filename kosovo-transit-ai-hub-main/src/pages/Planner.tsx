
import React from 'react';
import Layout from '@/components/Layout';
import TripPlanner from '@/components/TripPlanner';

const Planner = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Plan Your Trip</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <TripPlanner />
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
