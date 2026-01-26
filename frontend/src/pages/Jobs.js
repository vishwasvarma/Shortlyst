export default function Jobs() {
  return (
    <div>
      <h2>Jobs</h2>
      <textarea
        className="form-control"
        rows="6"
        placeholder="Paste Job Description here"
      ></textarea>
      <button className="btn btn-success mt-2">Save Job</button>
    </div>
  );
}
