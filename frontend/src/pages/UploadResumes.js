export default function UploadResumes() {
  return (
    <div>
      <h2>Upload Resumes</h2>
      <input type="file" className="form-control" multiple />
      <button className="btn btn-primary mt-2">Analyze</button>
    </div>
  );
}
