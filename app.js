let vue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        drawer: null,
        group: null,
        dialog: false,
        user: false,
        firebase: firebase,
        menuItems: [
            { name: 'Matériel divers', key: 1 },
            { name: 'Matériel cybernétique', key: 2 },
        ],
        currentPage: { name: "Cyberpunk app", key: 0 }
    }),
    methods: {
        navigateTo: function (item) {
            console.log("Navigate to: ", item.key)
            this.currentPage = item;
            this.drawer = false;
        }
    }
})




// FIREBASE stuff

initFirebaseAuth();

function initFirebaseAuth() {
    // Initialize the FirebaseUI Widget using Firebase.
    ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function () {
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/index.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
    };

    ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            vue.user = { displayName: null, photoURL: null }
        } else {
            vue.user = user
        }

    });
}
