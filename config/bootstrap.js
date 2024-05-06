/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (cb) {
    // By convention, this is a good place to set up fake data during development.
    //
    // For example:
    // ```
    // // Set up fake development data (or if we already have some, avast)
    // if (await User.count() > 0) {
    //   return;
    // }
    //
    // await User.createEach([
    //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
    //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
    //   // etc.
    // ]);
    // ```


    await Roles.findOrCreate({ roleName: "Admin" }, { roleName: "Admin" }).exec(
        async (error, role, wasCreated) => {
            if (error) throw error;
            if (wasCreated) {
                console.log("Admin Role created successfully");
            }
            await Roles.findOrCreate(
                { roleName: "Student" },
                { roleName: "Student" }
            ).exec(async (error, role, wasCreated) => {
                if (error) throw error;
                if (wasCreated) {
                    console.log("Student Role created successfully");
                }
                let role_record = await Roles.findOne({
                    roleName: "Admin",
                });
                if (role_record) {
                    await Users.findOrCreate(
                        { email: sails.config.constants.SuperAdmin.email },
                        {
                            firstName:
                                sails.config.constants.SuperAdmin.firstName,
                            lastName:
                                sails.config.constants.SuperAdmin.lastName,
                            email: sails.config.constants.SuperAdmin.email,
                            role: role_record.id,
                            googleAuth: false,
                            photoURL: ""
                        }
                    ).exec(async (error, user, wasCreated) => {
                        if (error) throw error;
                        if (wasCreated)
                            console.log("Admin created successfully");
                        // await EventRole.findOrCreate(
                        //   { eventRoleName: "Event Organizer" },
                        //   {
                        //     firstName: sails.config.constants.SuperAdmin.firstName,
                        //     lastName: sails.config.constants.SuperAdmin.lastName,
                        //     middleName: sails.config.constants.SuperAdmin.middleName,
                        //     email: sails.config.constants.SuperAdmin.email,
                        //     password: await sails.config.constants.Dependencies.bcrypt.hash(sails.config.constants.SuperAdmin.password, 10),
                        //     role: role_record.id
                        //   }
                        // ).exec((error, user, wasCreated) => {
                        //   if (error) throw error;
                        //   if (wasCreated)
                        //     console.log("Admin created successfully");
                        // });
                    });
                }
            });
        }
    );

    sails.config.port = 2000;

    cb();
};
