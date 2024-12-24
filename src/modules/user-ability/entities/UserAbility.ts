import Ability from "@modules/ability/entities/Ability";
import User from "@modules/user/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";

@Entity("users_abilities")
class UsersAbility {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column()
  user_id?: string;

  @ManyToOne(() => Ability, (ability) => ability.id)
  @JoinColumn({ name: "ability_id" })
  ability?: Ability;

  @Column()
  ability_id?: string;

  @Column("int")
  years_experience?: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default UsersAbility;
