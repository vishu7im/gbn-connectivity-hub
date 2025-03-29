
import React, { useState, useEffect } from "react";
import { Palette, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, color, setColor, font, setFont } = useTheme();

  const colorOptions = [
    { name: "Blue", value: "blue" as const, primary: "#0a2463", accent: "#3e92cc" },
    { name: "Green", value: "green" as const, primary: "#2d6a4f", accent: "#40916c" },
    { name: "Purple", value: "purple" as const, primary: "#5a189a", accent: "#7b2cbf" },
    { name: "Orange", value: "orange" as const, primary: "#e76f51", accent: "#f4a261" },
    { name: "Red", value: "red" as const, primary: "#d62828", accent: "#f77f00" },
  ];

  const fontOptions = [
    { name: "System Default", value: "system" as const },
    { name: "Inter", value: "inter" as const },
    { name: "Poppins", value: "poppins" as const },
    { name: "Roboto", value: "roboto" as const },
    { name: "Playfair Display", value: "playfair" as const },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-background shadow-lg hover:shadow-xl transition-all"
          >
            <Palette className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" side="top" align="end">
          <div className="flex items-center justify-between pb-4">
            <h3 className="font-medium">Customize Theme</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="colors">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="mode">Mode</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="fonts">Fonts</TabsTrigger>
            </TabsList>
            <TabsContent value="mode">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Label htmlFor="theme-mode">Dark Mode</Label>
                  <Moon className="h-4 w-4" />
                </div>
                <Switch
                  id="theme-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </TabsContent>
            <TabsContent value="colors">
              <div className="grid grid-cols-2 gap-2">
                {colorOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className={`flex items-center justify-between h-12 ${
                      color === option.value ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setColor(option.value)}
                  >
                    <span>{option.name}</span>
                    <div className="flex space-x-1">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: option.primary }}
                      />
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: option.accent }}
                      />
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="fonts">
              <div className="space-y-2">
                {fontOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className={`w-full justify-start ${
                      font === option.value ? "border-2 border-primary" : ""
                    } ${option.value !== "system" ? `font-${option.value}` : ""}`}
                    onClick={() => setFont(option.value)}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeCustomizer;
