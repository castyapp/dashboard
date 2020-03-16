<template>
    <div>
        <h5>Redirecting...</h5>
    </div>
</template>

<script>

    let redirect_url = "https://accounts.google.com/o/oauth2/auth?" +
        "access_type=offline&" +
        "client_id=333498721206-5s2s31pbh26rlquclst8frr8pml873sc.apps.googleusercontent.com&" +
        "redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth%2Fgoogle%2Fcallback&" +
        "response_type=code&" +
        "scope=profile+email+openid&" +
        "state=state";

    export default {
        name: "GoogleOAUTH",
        mounted() {
            location.replace(redirect_url);
        }
    }

</script>