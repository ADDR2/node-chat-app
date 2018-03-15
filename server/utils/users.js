class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        this.users.push({
            id,
            name,
            room
        });

        return this.users[this.users.length-1];
    }

    removeUser(id) {
        let deletedUser = null;
        this.users = this.users.filter(
            user => {
                const condition = id === user.id;
                if(condition) deletedUser = user;

                return !condition;
            }
        );

        return deletedUser;
    }

    getUser(id) {
        return this.users.find(user => id === user.id);
    }

    getUserList(room) {
        const usersInRoom = this.users.filter(user => room === user.room);
        return usersInRoom.map(user => user.name);
    }
}

module.exports = Users;