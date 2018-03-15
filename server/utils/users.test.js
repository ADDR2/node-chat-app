const expect = require('expect');

const Users = require('./users');

describe('Users', () => {

    beforeEach(() => {
        this.users = new Users();
        this.users.users = [
            { id: '1', name: 'Mike', room: 'Node Course'},
            { id: '2', name: 'Jen', room: 'React Course'},
            { id: '3', name: 'Julie', room: 'Node Course'}
        ];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };

        const resUser = users.addUser(...Object.values(user));

        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        expect(this.users.getUserList('Node Course')).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        expect(this.users.getUserList('React Course')).toEqual(['Jen']);
    });

    it('should remove a user', () => {
        expect(this.users.removeUser('1')).toEqual({ id: '1', name: 'Mike', room: 'Node Course'});
        expect(this.users.users).toEqual([
            { id: '2', name: 'Jen', room: 'React Course'},
            { id: '3', name: 'Julie', room: 'Node Course'}
        ]);
    });

    it('should not remove a user', () => {
        expect(this.users.removeUser('0')).toEqual(null);
        expect(this.users.users).toEqual([
            { id: '1', name: 'Mike', room: 'Node Course'},
            { id: '2', name: 'Jen', room: 'React Course'},
            { id: '3', name: 'Julie', room: 'Node Course'}
        ]);
    });

    it('should find a user', () => {
        expect(this.users.getUser('1')).toEqual({ id: '1', name: 'Mike', room: 'Node Course'});
    });

    it('should not find a user', () => {
        expect(this.users.getUser('0')).toNotExist();
    });
});