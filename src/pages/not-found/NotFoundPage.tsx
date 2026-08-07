import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@shared/ui/container";
import { Button } from "@shared/ui/button";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 text-center">
      <Container size="sm" className="space-y-6">
        <h1 className="text-6xl font-extrabold text-amber-500">404</h1>
        <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
        <p className="text-sm text-neutral-400">
          The requested page does not exist or has been moved.
        </p>
        <Link to="/" className="inline-block">
          <Button variant="primary" size="md">
            Return to Homepage
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default NotFoundPage;
