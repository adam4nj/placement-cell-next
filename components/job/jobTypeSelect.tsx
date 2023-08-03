"use client";

import { Select, SelectContent, SelectTrigger, SelectItem } from "../ui/select";

import { usePathname, useRouter } from "next/navigation";

export const JobTypeSelect = ({ selected }: { selected: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const onSelect = (event: string) => {
    const current = new URLSearchParams(window.location.search);

    const value = event;

    if (!value) {
      current.delete("selected");
    } else {
      current.set("selected", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Select value={selected} onValueChange={onSelect}>
      <SelectTrigger>Choose Job</SelectTrigger>
      <SelectContent>
        <SelectItem value="Job">Job</SelectItem>
        <SelectItem value="Internship">Internship</SelectItem>
      </SelectContent>
    </Select>
  );
};
