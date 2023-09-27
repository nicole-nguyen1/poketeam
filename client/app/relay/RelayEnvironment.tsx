"use client";

import * as React from "react";
import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { initRelayEnvironment } from "../environment";

export default function RelayEnvironment({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	const environment = useMemo(() => {
		return initRelayEnvironment();
	}, []);

	return (
		<RelayEnvironmentProvider environment={environment}>
			{children}
		</RelayEnvironmentProvider>
	);
}
