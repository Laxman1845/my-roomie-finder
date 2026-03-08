import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";

interface PhotoUploadProps {
  hostelId: string;
  onUpload: () => void;
}

const PhotoUpload = ({ hostelId, onUpload }: PhotoUploadProps) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${hostelId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("hostel-photos")
      .upload(path, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("hostel-photos").getPublicUrl(path);

    const { error: dbError } = await supabase.from("hostel_photos").insert({
      hostel_id: hostelId,
      uploaded_by: user.id,
      photo_url: urlData.publicUrl,
    });

    if (dbError) {
      toast.error("Failed to save photo");
    } else {
      toast.success("Photo uploaded!");
      onUpload();
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="mb-6">
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="gap-2"
      >
        <Camera className="h-4 w-4" />
        {uploading ? "Uploading..." : "Add Photo"}
      </Button>
    </div>
  );
};

export default PhotoUpload;
