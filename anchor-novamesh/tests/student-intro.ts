import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { StudentIntro } from "../target/types/student_intro";
import { expect } from "chai";

describe("student-intro", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.StudentIntro as Program<StudentIntro>;

    const student = {
        name: "Xavier",
        intro: "I'm here to learn!",
        age: 27,
    }

    const [studentPDA] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from(student.name), provider.wallet.publicKey.toBuffer()], program.programId)


    it("initialize student", async () => {
        const tx = await program.methods.addStudent(student.name, student.intro, student.age).rpc();
        console.log(`Transaction Signature: ${tx}`);
        const account = await program.account.student.fetch(studentPDA);
        // expect(account.address.toBase58).to.equal(provider.wallet.publicKey.toBase58());
        expect(account.name).to.equal(student.name);
        expect(account.intro).to.equal(student.intro);
        expect(account.age).to.equal(student.age);
    })
})