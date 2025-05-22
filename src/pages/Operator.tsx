
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Operator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Mock data for charts
  const passengerData = [
    { time: '6am', count: 145 },
    { time: '7am', count: 320 },
    { time: '8am', count: 480 },
    { time: '9am', count: 380 },
    { time: '10am', count: 280 },
    { time: '11am', count: 230 },
    { time: '12pm', count: 310 },
    { time: '1pm', count: 340 },
    { time: '2pm', count: 290 },
    { time: '3pm', count: 320 },
    { time: '4pm', count: 450 },
    { time: '5pm', count: 520 },
    { time: '6pm', count: 490 },
    { time: '7pm', count: 360 },
    { time: '8pm', count: 220 },
    { time: '9pm', count: 160 },
  ];
  
  const fleetData = [
    { name: 'Operational', value: 128 },
    { name: 'Maintenance', value: 15 },
    { name: 'Out of Service', value: 7 },
  ];
  
  const routePerformanceData = [
    { name: 'Pristina-Prizren', onTime: 92, delayed: 8 },
    { name: 'Pristina-Peja', onTime: 88, delayed: 12 },
    { name: 'Pristina-Mitrovica', onTime: 95, delayed: 5 },
    { name: 'Pristina-Gjilan', onTime: 90, delayed: 10 },
    { name: 'City Line 1', onTime: 96, delayed: 4 },
    { name: 'City Line 2', onTime: 94, delayed: 6 },
  ];
  
  const FLEET_COLORS = ['#10B981', '#FBBF24', '#EF4444'];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Operator Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Date:</span>
            <input
              type="date"
              className="border rounded p-1"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Numri i pasagjerëve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4,725</div>
              <div className="text-sm text-green-600">+12% nga dita e djeshme</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Performanca në kohë</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">93%</div>
              <div className="text-sm text-green-600">+2% nga java e kaluar </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">€2,850</div>
              <div className="text-sm text-green-600">+8% from yesterday</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
            <TabsTrigger value="routes">Route Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Passenger Traffic Throughout the Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={passengerData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Passengers" fill="#1E3A8A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fleet">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={fleetData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {fleetData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={FLEET_COLORS[index % FLEET_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fleetData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: FLEET_COLORS[index % FLEET_COLORS.length] }} 
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className="font-semibold">{item.value} vehicles</div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between">
                        <span>Total Fleet Size:</span>
                        <span className="font-bold">
                          {fleetData.reduce((sum, item) => sum + item.value, 0)} vehicles
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Operational Ratio:</span>
                        <span className="font-bold text-green-600">
                          {Math.round((fleetData[0].value / fleetData.reduce((sum, item) => sum + item.value, 0)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={routePerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="onTime" name="On Time" stackId="a" fill="#10B981" />
                      <Bar dataKey="delayed" name="Delayed" stackId="a" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Operator;
