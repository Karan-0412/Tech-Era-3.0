import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { EVENTS } from "@/data/events";

type Step = "init" | "name" | "email" | "phone" | "event" | "team_name" | "team_leader_uid" | "team_uid" | "team_member_name" | "team_member_email" | "team_member_phone" | "team_review" | "submitting" | "success" | "error";

interface TeamMember {
  uid: string;
  name: string;
  email: string;
  phone: string;
}

interface TerminalLine {
  text: string;
  color: "green" | "cyan" | "red" | "dim";
}

interface TerminalOverlayProps {
  open: boolean;
  onClose: () => void;
}

const AUTO_TYPE_SPEED = 35;
const INTERACTIVE_STEPS: Step[] = [
  "name",
  "email",
  "phone",
  "event",
  "team_name",
  "team_leader_uid",
  "team_uid",
  "team_member_name",
  "team_member_email",
  "team_member_phone",
  "team_review",
];

const useAutoType = (text: string, onDone: () => void, active: boolean) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onDone();
      }
    }, AUTO_TYPE_SPEED);
    return () => clearInterval(interval);
  }, [text, active, onDone]);

  return displayed;
};

const Scanlines = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-[0.06]">
    <div
      className="w-full h-[200%] animate-scanline"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--neon-green) / 0.15) 2px, hsl(var(--neon-green) / 0.15) 4px)",
      }}
    />
  </div>
);

const TypingLine = ({
  text,
  active,
  onDone,
  color = "green",
}: {
  text: string;
  active: boolean;
  onDone: () => void;
  color?: "green" | "cyan" | "red" | "dim";
}) => {
  const displayed = useAutoType(text, onDone, active);
  const colorClass =
    color === "cyan"
      ? "text-primary"
      : color === "red"
      ? "text-destructive"
      : color === "dim"
      ? "text-muted-foreground"
      : "text-accent text-glow-green";

  return (
    <div className={`font-mono text-xs sm:text-sm ${colorClass}`}>
      {displayed}
      {active && displayed.length < text.length && (
        <span className="animate-typing-cursor">▌</span>
      )}
    </div>
  );
};

const TerminalOverlay = ({ open, onClose }: TerminalOverlayProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("init");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null);
  const [teamName, setTeamName] = useState("");
  const [leaderUid, setLeaderUid] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentMemberData, setCurrentMemberData] = useState({ uid: "", name: "", email: "", phone: "" });
  const [memberFieldStep, setMemberFieldStep] = useState<"uid" | "name" | "email" | "phone">("uid");
  const [shakeInput, setShakeInput] = useState(false);
  const [currentAutoType, setCurrentAutoType] = useState<{
    text: string;
    color: TerminalLine["color"];
  } | null>(null);
  const [autoTypeDone, setAutoTypeDone] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLine = useCallback(
    (text: string, color: TerminalLine["color"] = "green") => {
      setLines((prev) => [...prev, { text, color }]);
    },
    []
  );

  const startAutoType = useCallback(
    (text: string, color: TerminalLine["color"] = "green") => {
      setAutoTypeDone(false);
      setCurrentAutoType({ text, color });
    },
    []
  );

  const handleAutoTypeDone = useCallback(() => {
    if (currentAutoType) {
      addLine(currentAutoType.text, currentAutoType.color);
      setCurrentAutoType(null);
      setAutoTypeDone(true);
    }
  }, [currentAutoType, addLine]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines, currentAutoType]);

  useEffect(() => {
    if (autoTypeDone && INTERACTIVE_STEPS.includes(step)) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [autoTypeDone, step]);

  useEffect(() => {
    if (!open) return;
    setStep("init");
    setLines([]);
    setInputValue("");
    setName("");
    setEmail("");
    setPhone("");
    setTeamName("");
    setLeaderUid("");
    setSelectedEvent(null);
    setTeamMembers([]);
    setCurrentMemberData({ uid: "", name: "", email: "", phone: "" });
    setMemberFieldStep("uid");
    setCurrentAutoType(null);
    setAutoTypeDone(false);

    const t1 = setTimeout(() => {
      startAutoType("> Initializing registration session...", "dim");
    }, 400);

    return () => clearTimeout(t1);
  }, [open, startAutoType]);

  useEffect(() => {
    if (step === "init" && autoTypeDone && !currentAutoType) {
      const t = setTimeout(() => {
        addLine("> Registration session started.", "green");
        const t2 = setTimeout(() => {
          setStep("name");
          startAutoType("> Please enter your full name:", "green");
        }, 600);
        return () => clearTimeout(t2);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [step, autoTypeDone, currentAutoType, addLine, startAutoType]);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const triggerError = (msg: string) => {
    addLine(`> Error: ${msg}`, "red");
    setShakeInput(true);
    setTimeout(() => setShakeInput(false), 500);
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;

    if (step === "name") {
      if (val.length < 2 || val.length > 50) {
        triggerError("Name is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setName(val);
      setInputValue("");
      setStep("email");
      setTimeout(() => startAutoType("> Please enter your email address:", "green"), 300);
    } else if (step === "email") {
      if (!validateEmail(val)) {
        triggerError("Email address is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setEmail(val);
      setInputValue("");
      setStep("phone");
      setTimeout(() => startAutoType("> Please enter your phone number:", "green"), 300);
    } else if (step === "phone") {
      if (val.length < 7) {
        triggerError("Phone number is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setPhone(val);
      setInputValue("");
      setStep("event");
      addLine("> Available events:", "dim");
      EVENTS.forEach(ev => addLine(`  [${ev.id}] ${ev.name} (Max: ${ev.limit})`, "cyan"));
      setTimeout(() => startAutoType("> Enter the event ID:", "green"), 300);
    } else if (step === "event") {
      const ev = EVENTS.find(e => e.id === val);
      if (!ev) {
        triggerError("Event ID is not valid. Please try again.");
        return;
      }
      addLine(`> ${ev.name}`, "green");
      setSelectedEvent(ev);
      setInputValue("");
      setStep("team_name");
      setTimeout(() => startAutoType("> Please enter your team name:", "green"), 300);
    } else if (step === "team_name") {
      if (val.length < 2 || val.length > 50) {
        triggerError("Team name is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setTeamName(val);
      setInputValue("");
      setStep("team_leader_uid");
      setTimeout(() => startAutoType("> Please enter the team leader UID:", "green"), 300);
    } else if (step === "team_leader_uid") {
      if (val.length < 2) {
        triggerError("Leader UID is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setLeaderUid(val);
      setInputValue("");
      
      if (selectedEvent?.limit === 1) {
        // Solo event - skip team members and go directly to review
        setStep("team_review");
        setTimeout(
          () =>
            startAutoType(
              "> Review the team details below and type 'confirm' to continue:",
              "green",
            ),
          300,
        );
      } else {
        // Team event - ask for team members
        setCurrentMemberData({ uid: "", name: "", email: "", phone: "" });
        setMemberFieldStep("uid");
        setStep("team_uid");
        setTimeout(
          () =>
            startAutoType(
              `> You can add up to ${(selectedEvent?.limit || 1) - 1} additional team member(s):`,
              "green",
            ),
          300,
        );
        setTimeout(
          () => startAutoType(`> Enter a member UID or type 'skip' to continue:`, "green"),
          600,
        );
      }
    } else if (step === "team_uid") {
      const normalizedVal = val.toLowerCase().trim();
      if (memberFieldStep === "uid" && (normalizedVal === "yes" || normalizedVal === "y")) {
        setCurrentMemberData({ uid: "", name: "", email: "", phone: "" });
        setMemberFieldStep("uid");
        setInputValue("");
        setTimeout(() => startAutoType(`> ENTER MEMBER_UID:`, "green"), 300);
        return;
      } else if (memberFieldStep === "uid" && (normalizedVal === "no" || normalizedVal === "n")) {
        addLine("> Team members finalized.", "green");
        setInputValue("");
        setStep("team_review");
        setTimeout(
          () =>
            startAutoType(
              "> Review the team details below and type 'confirm' to continue:",
              "green",
            ),
          300,
        );
        return;
      }

      if (normalizedVal === "skip" && teamMembers.length === 0) {
        addLine("> Team members skipped.", "green");
        setInputValue("");
        setStep("team_review");
        setTimeout(
          () =>
            startAutoType(
              "> Review the team details below and type 'confirm' to continue:",
              "green",
            ),
          300,
        );
        return;
      }

      if (val.length < 2) {
        triggerError("Member ID is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setCurrentMemberData(prev => ({ ...prev, uid: val }));
      setInputValue("");
      setMemberFieldStep("name");
      setStep("team_member_name");
      setTimeout(() => startAutoType("> Please enter the member name:", "green"), 300);
    } else if (step === "team_member_name") {
      if (val.length < 2 || val.length > 50) {
        triggerError("Member name is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setCurrentMemberData(prev => ({ ...prev, name: val }));
      setInputValue("");
      setMemberFieldStep("email");
      setStep("team_member_email");
      setTimeout(
        () => startAutoType("> Please enter the member email address:", "green"),
        300,
      );
    } else if (step === "team_member_email") {
      if (!validateEmail(val)) {
        triggerError("Member email address is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      setCurrentMemberData(prev => ({ ...prev, email: val }));
      setInputValue("");
      setMemberFieldStep("phone");
      setStep("team_member_phone");
      setTimeout(() => startAutoType("> Please enter the member phone number:", "green"), 300);
    } else if (step === "team_member_phone") {
      if (val.length < 7) {
        triggerError("Member phone number is not valid. Please try again.");
        return;
      }
      addLine(`> ${val}`, "green");
      const completedMember: TeamMember = { ...currentMemberData, phone: val };
      const newMembersList = [...teamMembers, completedMember];
      setTeamMembers(newMembersList);
      setInputValue("");

      const maxMembers = (selectedEvent?.limit || 1) - 1;
      if (newMembersList.length < maxMembers) {
        setTimeout(
          () =>
            startAutoType(
              `> Would you like to add another member? (yes/no) [${newMembersList.length}/${maxMembers}]:`,
              "green",
            ),
          300,
        );
        setStep("team_uid");
        setMemberFieldStep("uid");
      } else {
        addLine("> Maximum team size reached.", "cyan");
        setStep("team_review");
        setTimeout(
          () =>
            startAutoType(
              "> Review the team details below and type 'confirm' to continue:",
              "green",
            ),
          600,
        );
      }
    } else if (step === "team_review") {
      const normalizedVal = val.toLowerCase();
      if (normalizedVal === "confirm") {
        addLine("> Team confirmed.", "green");
        setInputValue("");
        setStep("submitting");
        setTimeout(() => submitRegistration(), 300);
      } else if (normalizedVal === "modify") {
        addLine("> Entering modification mode...", "dim");
        setInputValue("");
        // For now, redirect to submission. In a real app, you'd reopen editing.
        setStep("submitting");
        setTimeout(() => submitRegistration(), 1000);
      } else {
        triggerError("Command not recognized. Type 'confirm' or 'modify'.");
      }
    }
  };

  const submitRegistration = () => {
    addLine("> Preparing registration data...", "dim");

    const submitData = async () => {
        const registrationData = {
          userName: name,
          userEmail: email,
          userPhone: phone,
          selectedEvent: selectedEvent,
          teamName: teamName,
          leaderUid: leaderUid,
          teamMembers: teamMembers,
          registeredAt: new Date().toISOString()
        };

        const appsScriptUrl = import.meta.env.VITE_GOOGLE_SHEET_APPS_SCRIPT_URL;
        if (appsScriptUrl) {
          try {
            if (import.meta.env.DEV) {
              console.log("Submitting registration to Google Sheets:", registrationData);
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            let response: Response;
            try {
              response = await fetch(appsScriptUrl, {
                method: "POST",
                headers: { "Content-Type": "text/plain" }, // Apps Script needs this
                body: JSON.stringify(registrationData),
                signal: controller.signal,
              });
            } finally {
              clearTimeout(timeoutId);
            }

            const contentType = response.headers.get("content-type") || "";
            let result: { status?: string; message?: string } = {};

            if (contentType.includes("application/json")) {
              result = await response.json();
            } else {
              const textBody = await response.text();
              result = { message: textBody };
            }

            if (!response.ok) {
              throw new Error(result.message || `Request failed with status ${response.status}`);
            }

            if (result.status && result.status !== "success") {
              throw new Error(result.message || "Unexpected response from spreadsheet service");
            }

            if (import.meta.env.DEV) {
              console.log("Fetch completed successfully");
            }
            addLine("> ✓ Registration data submitted to spreadsheet.", "cyan");
          } catch (e) {
            console.error("Failed to sync with spreadsheet:", e);
            const errorMsg = e instanceof Error ? e.message : String(e);
            addLine(
              `> Error syncing with spreadsheet: ${errorMsg}`,
              "red",
            );
          }
        } else {
          console.warn("Google Sheets API URL not configured");
          addLine("> Error: Google Sheets URL not configured. Contact admin.", "red");
        }

        setTimeout(() => {
          addLine("> Submitting registration...", "dim");
          setTimeout(() => {
            addLine("> Verifying details...", "dim");
            setTimeout(() => {
              setStep("success");
              addLine("> Registration successful. Welcome to TECH ERA 3.0.", "cyan");
              addLine(`> Participant "${name}" registered successfully.`, "cyan");
              if (email) {
                addLine(`> EMAIL: ${email}`, "dim");
              }
              if (phone) {
                addLine(`> PHONE: ${phone}`, "dim");
              }
              if (selectedEvent) {
                addLine(`> EVENT: ${selectedEvent.name.toUpperCase()}`, "dim");
              }
              if (teamName) {
                addLine(`> TEAM_NAME: ${teamName.toUpperCase()}`, "dim");
                addLine(`> LEADER_UID: ${leaderUid.toUpperCase()}`, "dim");
                addLine(`> LEADER_NAME: ${name.toUpperCase()}`, "dim");
                addLine(`> LEADER_EMAIL: ${email.toUpperCase()}`, "dim");
                addLine(`> LEADER_PHONE: ${phone.toUpperCase()}`, "dim");
              }
              if (teamMembers.length > 0) {
                addLine(
                  `> TEAM_MEMBERS: ${teamMembers
                    .map(m => m.name)
                    .join(", ")
                    .toUpperCase()}`,
                  "dim",
                );
              } else if (teamName) {
                addLine(`> TEAM_MEMBERS: NONE (INDIVIDUAL REGISTRATION)`, "dim");
              }

              localStorage.setItem("techEraRegistration", JSON.stringify(registrationData));
              window.dispatchEvent(new Event("registrationUpdate"));

              const memberCount = teamMembers.length;
              toast({
                title: "Team Registered Successfully",
                description: `Team "${teamName}" (Leader: ${leaderUid}) registered with ${memberCount} member${memberCount !== 1 ? 's' : ''}.`,
                variant: "default",
              });

              setTimeout(() => {
                onClose();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 3000);
            }, 800);
          }, 700);
        }, 600);
      };

      submitData();
  };

  const showInput = autoTypeDone && !currentAutoType && INTERACTIVE_STEPS.includes(step);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background"
        >
          {/* Scanlines */}
          <Scanlines />

          {/* Header bar */}
          <div className="relative z-20 flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[11px] text-accent tracking-[0.3em]">
                APEX MAINFRAME v3.0.0
              </span>
            </div>
            <button
              onClick={onClose}
              className="font-mono text-xs text-red-400 hover:text-red-300 transition-colors tracking-wider"
            >
              [ESC] CLOSE
            </button>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="relative z-20 flex-1 overflow-y-auto px-4 sm:px-8 py-6 font-mono text-xs sm:text-sm"
          >
            <div className="max-w-2xl mx-auto space-y-1">
              {/* Rendered lines */}
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={
                    line.color === "cyan"
                      ? "text-primary"
                      : line.color === "red"
                      ? "text-destructive"
                      : line.color === "dim"
                      ? "text-muted-foreground"
                      : "text-accent text-glow-green"
                  }
                >
                  {line.text}
                </motion.div>
              ))}

              {/* Team review display */}
              {step === "team_review" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 space-y-2 border-l-2 border-primary/30 pl-3"
                >
                  <div className="text-primary">// TEAM_DETAILS</div>
                  <div className="text-muted-foreground">TEAM_NAME: {teamName}</div>
                  <div className="text-cyan-400 mt-3">// LEADER_INFO</div>
                  <div className="text-muted-foreground">  LEADER_UID: {leaderUid}</div>
                  <div className="text-muted-foreground">  LEADER_NAME: {name}</div>
                  <div className="text-muted-foreground">  LEADER_EMAIL: {email}</div>
                  <div className="text-muted-foreground">  LEADER_PHONE: {phone}</div>
                  {teamMembers.length > 0 ? (
                    <>
                      <div className="text-muted-foreground mt-3">MEMBERS: {teamMembers.length}</div>
                      {teamMembers.map((member, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-cyan-400 space-y-1"
                        >
                          <div>  [MEMBER_{idx + 1}]</div>
                          <div className="text-muted-foreground ml-4">UID: {member.uid}</div>
                          <div className="text-muted-foreground ml-4">NAME: {member.name}</div>
                          <div className="text-muted-foreground ml-4">EMAIL: {member.email}</div>
                          <div className="text-muted-foreground ml-4">PHONE: {member.phone}</div>
                        </motion.div>
                      ))}
                    </>
                  ) : (
                    <div className="text-muted-foreground">MEMBERS: NONE (SOLO_MODE)</div>
                  )}
                </motion.div>
              )}

              {/* Currently auto-typing line */}
              {currentAutoType && (
                <TypingLine
                  text={currentAutoType.text}
                  color={currentAutoType.color}
                  active
                  onDone={handleAutoTypeDone}
                />
              )}

              {/* Input line */}
              {showInput && (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={shakeInput ? { x: [-8, 8, -6, 6, -3, 3, 0], opacity: 1 } : { opacity: 1 }}
                  transition={shakeInput ? { duration: 0.4 } : { duration: 0.2 }}
                  className="flex items-center gap-2 mt-2"
                >
                  <span className="text-accent">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-accent font-mono text-xs sm:text-sm caret-accent placeholder:text-muted-foreground/40"
                    placeholder={
                      step === "name"
                        ? "Your full name"
                        : step === "email"
                        ? "your@email.com"
                        : step === "phone"
                        ? "+XX XXXXX-XXXXX"
                        : step === "event"
                        ? "Event ID"
                        : step === "team_name"
                        ? "team_name"
                        : step === "team_leader_uid"
                        ? "Leader UID"
                        : step === "team_uid"
                        ? teamMembers.length > 0 ? "yes or no" : "Member UID or 'skip'"
                        : step === "team_member_name"
                        ? "Member name"
                        : step === "team_member_email"
                        ? "member@email.com"
                        : step === "team_member_phone"
                        ? "+XX XXXXX-XXXXX"
                        : "confirm"
                    }
                  />
                  <span className="text-accent animate-typing-cursor">▌</span>
                </motion.form>
              )}

              {/* Success close prompt */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6"
                >
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 300);
                    }}
                    className="font-mono text-xs text-accent hover:text-accent transition-colors tracking-wider border border-accent/40 px-4 py-2 rounded hover:bg-accent/10"
                  >
                    {">"} Close and return
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="relative z-20 px-4 py-2 border-t border-border flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground/50">
              SECURE CHANNEL • AES-256 ENCRYPTED
            </span>
            <span className="font-mono text-[11px] text-accent/40">
              {step === "success" ? "● CONNECTED" : "○ PENDING"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalOverlay;
