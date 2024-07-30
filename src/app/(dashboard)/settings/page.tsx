import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileForm } from "./_components/profile-form";
import { auth } from "@/lib/auth";
import { PasswordForm } from "./_components/password-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div
      className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 h-full"
      // style={{ overflow: "hidden scroll" }}
    >
      <div className="flex flex-col gap-8">
        {/* <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Update your personal information.
            </p>
          </div>
          <Card>
            <CardContent className="grid gap-6">
              <Form {...form}>
                <form className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="I'm a passionate software engineer with a focus on building scalable and performant web applications."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button className="ml-auto">Save</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div> */}
        <ProfileForm expires={session.expires} user={session.user} />
        <PasswordForm />

        {/* <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Manage your notification preferences.
            </p>
          </div>
          <Card>
            <CardContent className="grid gap-4">
              <div className="-mx-2 flex items-start gap-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                <div className="h-5 w-5 mt-px" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Everything</p>
                  <p className="text-sm text-muted-foreground">
                    Email digest, mentions & all activity.
                  </p>
                </div>
              </div>
              <div className="-mx-2 flex items-start gap-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
                <div className="h-5 w-5 mt-px" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Available</p>
                  <p className="text-sm text-muted-foreground">
                    Only mentions and comments.
                  </p>
                </div>
              </div>
              <div className="-mx-2 flex items-start gap-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                <div className="h-5 w-5 mt-px" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Ignoring</p>
                  <p className="text-sm text-muted-foreground">
                    Turn off all notifications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
