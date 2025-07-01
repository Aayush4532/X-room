"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, UploadCloud } from "lucide-react";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [form, setForm] = useState({ role: "candidate", age: "" });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const SERVER_URL = process.env.NEXT_PUBLIC_SIGNAL_URL;

  const checkUser = async (clerkId) => {
    const res = await fetch(`${SERVER_URL}checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ clerkId }),
    });
    const { exists } = await res.json();
    return exists;
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    (async () => {
      try {
        const exists = await checkUser(user.id);
        if (exists) {
          router.replace("/");
        } else {
          setChecking(false);
        }
      } catch (err) {
        console.error(err);
        setChecking(false);
      }
    })();
  }, [isLoaded, isSignedIn, user, router]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onFileChange = (e) => setAvatar(e.target.files?.[0] ?? null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      if (avatar) await user.setProfileImage({ file: avatar });

      await fetch(`${SERVER_URL}signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          role: form.role,
          age: Number(form.age),
        }),
      });

      router.replace("/");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || checking) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-black to-[#24243e] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white/5 backdrop-blur p-6 rounded-xl border border-white/10"
      >
        <h2 className="text-xl font-semibold text-center">Complete your profile</h2>
        <div className="space-y-2">
          <Label htmlFor="avatar">Profile photo</Label>
          <label
            htmlFor="avatar"
            className="flex cursor-pointer items-center gap-2 rounded border border-white/20 bg-white/10 px-3 py-2 hover:bg-white/20"
          >
            <UploadCloud size={18} />
            <span>{avatar ? avatar.name : "Choose image"}</span>
          </label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Your age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            min="14"
            max="120"
            value={form.age}
            onChange={onChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>What describes you best?</Label>
          <RadioGroup
            value={form.role}
            onValueChange={(val) => setForm((f) => ({ ...f, role: val }))}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="candidate"
                id="cand"
                className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white focus-visible:ring-white"
              />
              <Label htmlFor="cand" className="text-sm">I’m looking for a job</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="hr"
                id="hr"
                className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white focus-visible:ring-white"
              />
              <Label htmlFor="hr" className="text-sm">I’m hiring candidates</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? <Loader2 className="animate-spin" size={18} />
            : "Save & Continue"}
        </Button>
      </form>
    </div>
  );
};
export default Page;