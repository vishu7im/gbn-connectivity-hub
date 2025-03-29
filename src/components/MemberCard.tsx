import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, GraduationCap } from "lucide-react";

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    batch: string;
    department: string;
    currentRole: string;
    company: string;
    profileImage?: string;
  };
  viewMode: "list" | "grid";
}

const MemberCard: React.FC<MemberCardProps> = ({ member, viewMode }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md  transition-shadow">
        <CardContent className="p-4 flex items-center">
          <Avatar className="h-14 w-14 mr-4">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-sm text-gray-500">
                  {member.currentRole} at {member.company}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Badge variant="outline" className="font-normal">
                  <GraduationCap className="mr-1 h-3 w-3" />
                  {member.batch}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  {member.department}
                </Badge>
              </div>
            </div>
          </div>
          <Link to={`/members/${member.id}`} className="ml-4">
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-col items-center text-center p-6">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-lg mt-4">{member.name}</h3>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className="font-normal">
            <GraduationCap className="mr-1 h-3 w-3" />
            {member.batch}
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {member.department}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-0 flex-1 text-center">
        <div className="flex items-center justify-center">
          <Building className="h-4 w-4 mr-1 text-gray-500" />
          <p className="text-gray-600">
            {member.currentRole} at {member.company}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-4 flex justify-center">
        <Link to={`/members/${member.id}`}>
          <Button>View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
