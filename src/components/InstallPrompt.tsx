import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User installed the PWA");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    deferredPrompt && (
      <button onClick={installApp}>Install App</button>
    )
  );
};

export default InstallPrompt;
