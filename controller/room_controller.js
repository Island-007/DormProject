const Student = require('../model/student_model');

module.exports = {
  getUsabledRooms: async function (rooms) {
    const array = [];
    for (let room of rooms) {
      const studentCount = await Student.count({ where: { roomId: room.dataValues.room_id } });
      if (studentCount < room.room_type) {
        const rest = room.room_type - studentCount;
        room.setDataValue("rest", rest);
        array.push(room);
      }
    }
    console.log(array);
    return array;
  }
}
