import React, { useState, useEffect } from "react";
import { UniformPlayground } from "@uniformdev/canvas-react";
import { RootComponentInstance } from "@uniformdev/canvas";
import "../../uniform/components";

export type PlaygroundProps = {
  data?: RootComponentInstance | null;
};

export const PlaygroundPage = ({ data }: PlaygroundProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading playground...
      </div>
    );
  }

  if (!data) {
    return (
      <UniformPlayground contextualEditingDefaultPlaceholder="Placeholder Text" />
    );
  }

  return <UniformPlayground />;
};

export default PlaygroundPage;
