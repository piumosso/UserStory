function test(x){
    UserStory.log(["Test call with [x=", x, "]"], ["example.test"]);
    return x * 5;
}

UserStory.log(["Run test"], ["example"]);
test(5);

