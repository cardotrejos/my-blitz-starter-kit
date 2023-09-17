import { Group } from "@mantine/core"
import { GoogleButton, TwitterButton } from "@/core/components/MainAuthenticationForm/SocialButtons"

const SocialButtonsAuth = () => {
  return (
    <Group grow mb="md" mt="md">
      <GoogleButton radius="xl">Google</GoogleButton>
      <TwitterButton radius="xl">Twitter</TwitterButton>
    </Group>
  )
}

export default SocialButtonsAuth
