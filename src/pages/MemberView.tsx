
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemberProfile from "@/components/MemberProfile";

const MemberView = () => {
  const { id } = useParams<{ id: string }>();
  const memberId = id ? parseInt(id) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <MemberProfile memberId={memberId} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MemberView;
