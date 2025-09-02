import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM creations  WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations =
      await sql`SELECT * FROM creations  WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleLikecreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIDstr = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIDstr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIDstr);
      message = "Creation Unliked";
    } else {
      updatedLikes = [...currentLikes, userIDstr];
      message = "Creation Liked";
    }

    const formattedArray = `{${updatedLikes.join(",")}}`;
    const [updatedCreation] = await sql`
      UPDATE creations 
      SET likes = ${formattedArray}::text[] 
      WHERE id = ${id}
      RETURNING *;
    `;

    res.json({ success: true, message, creation: updatedCreation });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
