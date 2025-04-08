import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Text, Tailwind, Section } from '@react-email/components';

interface BetterAuthVerifyEmailEmailProps {
    username?: string;
    verificationLink?: string;
}

export const VerifyEmailEmail = ({ username, verificationLink }: BetterAuthVerifyEmailEmailProps) => {
    const previewText = `Verify your email address`;
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white mx-auto my-auto px-2 font-sans">
                    <Container className="mx-auto my-[40px] p-[20px] border border-[#eaeaea] border-solid rounded max-w-[465px]">
                        <Img alt="Nexsus Education" className="mx-auto" height={150} src="https://nexsuseducation.com/logo.png" />
                        <Heading className="mx-0 my-[30px] p-0 font-normal text-[24px] text-black text-center">
                            Verify your <strong>Account</strong> email
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">Hello {username},</Text>
                        <Text className="text-[14px] text-black leading-[24px]">
                            We received a request to verify your email address for your Account. If you didn&apos;t make this request, you can safely
                            ignore this email.
                        </Text>
                        <Section className="mt-[32px] mb-[32px] text-center">
                            <Button
                                className="bg-[#000000] px-5 py-3 rounded font-semibold text-[12px] text-white text-center no-underline"
                                href={verificationLink}>
                                Verify Email
                            </Button>
                        </Section>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Or copy and paste this URL into your browser:{' '}
                            <Link href={verificationLink} className="text-blue-600 no-underline">
                                    {verificationLink}
                            </Link>
                        </Text>
                        <Hr className="mx-0 my-[26px] border border-[#eaeaea] border-solid w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            If you didn&apos;t request a email verification, please ignore this email or contact support if you have concerns.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export function reactVerifyEmailEmail(props: BetterAuthVerifyEmailEmailProps) {
    console.log(props);
    return <VerifyEmailEmail {...props} />;
}
