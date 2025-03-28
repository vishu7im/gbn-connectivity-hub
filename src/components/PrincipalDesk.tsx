
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const PrincipalDesk = () => {
  return (
    <section id="principal" className="py-12">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-6 w-6 text-[#0a2463]" />
        <h2 className="text-2xl font-bold text-[#0a2463]">From the Principal's Desk</h2>
      </div>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-[#0a2463] p-6 flex flex-col justify-center items-center text-white">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#e6c200] mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Principal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Dr. Rahul Sharma</h3>
                <p className="text-gray-300">Principal, GBN Polytechnic</p>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-[#0a2463]">Dear Alumni,</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  It gives me immense pleasure to connect with you through this alumni portal. The GBN Polytechnic has always taken pride in its graduates who have excelled in various fields across the globe.
                </p>
                <p>
                  Our institution stands on the pillars of excellence, innovation, and integrity. The success stories of our alumni strengthen these pillars and inspire our current students to aim higher.
                </p>
                <p>
                  I encourage all alumni to actively participate in the college activities, mentor our students, and contribute to the growth of your alma mater. Your experiences and insights are invaluable resources for the institution.
                </p>
                <p className="font-medium">
                  Together, let us build a stronger network that benefits our institution, current students, and the alumni community.
                </p>
                <div className="pt-2">
                  <p className="font-bold text-[#0a2463]">Dr. Rahul Sharma</p>
                  <p className="text-gray-600">Principal, GBN Polytechnic</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PrincipalDesk;
