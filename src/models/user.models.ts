import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: Number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  phone: number;
  about: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, username, password, phone, about) VALUES($1, $2 ,$3 , $4, $5, $6) RETURNING *";
      const hash = bcrypt.hashSync(
        (u.password + process.env.BYCRYPT_PASSWORD) as string,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash,
        u.phone,
        u.about,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE users SET first_name = $1, last_name = $2, username = $3, password = $4, phone = $5, about = $6 WHERE id = $7 RETURNING *";
      const hash = bcrypt.hashSync(
        u.password + process.env.BYCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash,
        u.phone,
        u.about,
        u.id,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT password FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);

    console.log(password + process.env.BYCRYPT_PASSWORD);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (
        bcrypt.compareSync(
          password + process.env.BYCRYPT_PASSWORD,
          user.password
        )
      ) {
        return user;
      }
    }
    return null;
  }
}
