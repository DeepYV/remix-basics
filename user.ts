export interface user {
    id ?: number;
    name: string;
    email: string;
    password: string;
}

export const users: user[] = [
    {
        id : 1,
        name: 'John Doe',
        email: 'd@diser',
        password: '123456'
    },
    {
        id : 2,
        name: 'Jane Doe',
        email: 'j@diser',
        password: '123456'
    },
    {
        id : 3,
        name: 'Jane',
        email: 'deepak@discern.com',
        password: '123456'
    }
]


export const loginUser = (user: user)  => {
   const  existingUser = findUserByEmail(user.email, user.password)
    if( !existingUser) {
     users.push(user)
    }
}
export const findUserByEmail = (email: string, password: string ) => {
    return users.find(u => u.email === email && u.password === password)
}

export const findUserById = (id: number) => {
    return users.find(u => u.id === id)

}
export const deleteUser=()  => {}