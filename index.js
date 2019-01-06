console.log("Hello");
getUser(1, (user) => {
    console.log("user is", user);
    getRepository(user.gitHubUserName, (repos) => {
        console.log("repos", repos)
    })
});
console.log("World");

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from the database");
        callback({id: id, gitHubUserName: "SikindarMirza"});
        
    },2000);
};

function getRepository(username, callback){
    setTimeout(() => {
        console.log("Calling the github API...");
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}