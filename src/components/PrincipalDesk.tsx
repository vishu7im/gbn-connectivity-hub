
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

// This would normally come from an API or context
const principalData = {
  name: "Dr. Sunil Kumar",
  title: "Principal, GBN Polytechnic",
  message: "Welcome to the GBN Polytechnic Alumni Portal. Our institution takes pride in the achievements of its alumni who are making significant contributions in various fields. This platform is designed to strengthen the bond between the institute and its alumni community, fostering collaboration, mentorship, and knowledge exchange. We believe in nurturing lifelong relationships with our students, and this alumni network is a testament to that commitment. I encourage all alumni to actively participate in our initiatives and help us build a vibrant community that supports the growth of both our current students and fellow alumni. Together, we can continue the legacy of excellence that GBN Polytechnic stands for.",
  photo: "https://randomuser.me/api/portraits/men/1.jpg"
};

const PrincipalDesk = () => {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">From the Principal's Desk</h2>
      
      <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-800 h-full">
              <Avatar className="h-40 w-40 md:h-48 md:w-48 border-4 border-white dark:border-slate-700 shadow-xl mb-4">
                <AvatarImage src={principalData.photo} alt={principalData.name} />
                <AvatarFallback className="text-4xl">
                  <UserRound className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold">{principalData.name}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{principalData.title}</p>
              </div>
            </div>
            
            <div className="md:w-2/3 p-8">
              <blockquote className="text-lg italic">
                <p className="mb-4 leading-relaxed">{principalData.message}</p>
                <footer className="text-right mt-4">
                  <div className="font-semibold">— {principalData.name}</div>
                </footer>
              </blockquote>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PrincipalDesk;
