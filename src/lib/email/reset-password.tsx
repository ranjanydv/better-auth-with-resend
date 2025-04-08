import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Text, Tailwind, Section } from '@react-email/components';

interface BetterAuthResetPasswordEmailProps {
    username?: string;
    resetLink?: string;
}

export const ResetPasswordEmail = ({ username, resetLink }: BetterAuthResetPasswordEmailProps) => {
    const previewText = `Reset your password`;
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white mx-auto my-auto px-2 font-sans">
                    <Container className="mx-auto my-[40px] p-[20px] border border-[#eaeaea] border-solid rounded max-w-[465px]">
                        <Heading className="mx-0 my-[30px] p-0 font-normal text-[24px] text-black text-center">
                            Reset your <strong>Account</strong> password
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">Hello {username},</Text>
                        <Text className="text-[14px] text-black leading-[24px]">
                            We received a request to reset your password for your Account. If you didn&apos;t make this request, you can safely
                            ignore this email.
                        </Text>
                        <Section className="mt-[32px] mb-[32px] text-center">
                            <Button
                                className="bg-[#000000] px-5 py-3 rounded font-semibold text-[12px] text-white text-center no-underline"
                                href={resetLink}>
                                Reset Password
                            </Button>
                        </Section>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Or copy and paste this URL into your browser:{' '}
                            <Link href={resetLink} className="text-blue-600 no-underline">
                                {resetLink}
                            </Link>
                        </Text>
                        <Hr className="mx-0 my-[26px] border border-[#eaeaea] border-solid w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            If you didn&apos;t request a password reset, please ignore this email or contact support if you have concerns.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export function reactResetPasswordEmail(props: BetterAuthResetPasswordEmailProps) {
    console.log(props);
    return <ResetPasswordEmail {...props} />;
}
