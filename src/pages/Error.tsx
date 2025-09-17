import { ErrorPageStatusCodes } from "@digi/arbetsformedlingen";
import { DigiLinkInternal, DigiNotificationErrorPage } from "@digi/arbetsformedlingen-react";

export const Error = () => {
	return (
		<>
			<DigiNotificationErrorPage afHttpStatusCode={ErrorPageStatusCodes.NOT_FOUND}>
				<ul slot="links">
					<li>
						<DigiLinkInternal afHref="/">
							Till startsidan
						</DigiLinkInternal>
					</li>
				</ul>
			</DigiNotificationErrorPage>
		</>
	);
};
