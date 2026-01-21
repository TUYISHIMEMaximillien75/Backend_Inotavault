import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Role } from "src/auth/enums/role.enum";

@Entity("users")

export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;
    
    @Column({ default: false })
    verified: boolean;

    @CreateDateColumn()
    createdAt: Date;
}

