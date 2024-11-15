import { 
  UserPlus, 
  Search, 
  Wallet, 
  ShieldCheck, 
  Send, 
  ThumbsUp 
} from "lucide-react";

const steps = [
  {
    title: "Create Account",
    description: "Sign up with your email and verify your identity to start trading.",
    icon: UserPlus,
  },
  {
    title: "Find a Seller",
    description: "Browse verified sellers with competitive rates and payment methods.",
    icon: Search,
  },
  {
    title: "Enter USDT Address",
    description: "Provide your USDT wallet address to receive the tokens.",
    icon: Wallet,
  },
  {
    title: "Secure Transaction",
    description: "Funds are held in escrow until the transaction is complete.",
    icon: ShieldCheck,
  },
  {
    title: "Make Payment",
    description: "Send payment using the seller's preferred payment method.",
    icon: Send,
  },
  {
    title: "Receive USDT",
    description: "Once payment is confirmed, USDT is released to your wallet.",
    icon: ThumbsUp,
  },
];

export function Steps() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-6 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 transition-all hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold leading-7 text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-300">
                  {step.description}
                </p>
              </div>
              <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}