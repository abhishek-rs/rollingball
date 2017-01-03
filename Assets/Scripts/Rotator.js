#pragma strict

function Update () {
	transform.Rotate (new Vector3 (14,30,45) * Time.deltaTime);
}