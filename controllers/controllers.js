export const root = async (req, res) => {
  return res.status(200).json({
    message: "success"
  });
}

export const ping = async (req, res) => {
  return res.status(200).json({
    message: "pong"
  });
}

