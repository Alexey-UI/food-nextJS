import { getServerToken } from "@/lib/auth/getServerToken";
import WinePairingClient from "./WinePairingClient";

export default async function WinePairingPage() {
  const token = await getServerToken();
  return <WinePairingClient token={token} />;
}
